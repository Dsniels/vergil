/** @format */

import {
	AfterViewChecked,
	Component,
	ElementRef,
	OnInit,
	signal,
	ViewChild,
} from "@angular/core";
import {SignalRService} from "../../services/signal.service";
import {BaseComponent} from "../../common/base-component/base-component";
import {CommonModule} from "@angular/common";
import {MarkdownComponent, MarkdownModule} from "ngx-markdown";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {NzCodeEditorModule} from "ng-zorro-antd/code-editor";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
	selector: "app-chat",
	imports: [
		NzCardComponent,
		NzButtonModule,
		NzCodeEditorModule,
		NzInputModule,
		ReactiveFormsModule,
		CommonModule,
		MarkdownModule,
		MarkdownComponent,
	],
	templateUrl: "./chat.html",
	styleUrl: "./chat.css",
})
export class Chat extends BaseComponent implements OnInit, AfterViewChecked {
	messages!: string[];
	response = signal<string>("");
	log = signal<string>("logs\n");
	formGroup!: FormGroup<{content: FormControl<string>}>;
	@ViewChild("chat") container!: ElementRef;
	constructor(private sinalRSvc: SignalRService) {
		super();
		this.sinalRSvc.onLog((v:any) => {
			console.log(v);
			this.log.update((s) => (s += v.log + "\n"));
		});
		this.sinalRSvc.start();

		this.messages = [];
	}

	ngAfterViewChecked(): void {
		this.autoScroll();
	}

	autoScroll() {
		this.container.nativeElement.scrollTop =
			this.container.nativeElement.scrollHeight;
	}

	sendMessage() {
		if (this.formGroup.invalid) {
			this.formGroup.markAllAsTouched();
			return;
		}
		const raw = this.formGroup.getRawValue();
		this.messages.push(raw.content);
		this.formGroup.reset({content: ""});
		this.sinalRSvc.chat({content: raw.content, role: 0}).subscribe({
			next: (t) => {
				this.response.update((v) => (v += t));
			},
			complete: () => {
				this.messages.push(this.response());
				this.response.set("");
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	ngOnInit(): void {
		this.formGroup = new FormGroup<{content: FormControl<string>}>({
			content: new FormControl("", {
				nonNullable: true,
				validators: [Validators.required],
			}),
		});
	}
}

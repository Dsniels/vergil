/** @format */

import {Component, OnInit, signal} from "@angular/core";
import {VergilService} from "../../services/vergil.service";
import {BaseComponent} from "../../common/base-component/base-component";
import {CommonModule} from "@angular/common";
import {MarkdownComponent, MarkdownModule} from "ngx-markdown";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {
	NzCodeEditorModule,
	NzCodeEditorComponent,
} from "ng-zorro-antd/code-editor";
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
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MarkdownModule,
		MarkdownComponent,
		NzCodeEditorComponent,
	],
	templateUrl: "./chat.html",
	styleUrl: "./chat.css",
})
export class Chat extends BaseComponent implements OnInit {
	messages!: string[];
	response = signal<string>("");
	log = signal<string>("logs\n");
	question = "";
	formGroup!: FormGroup;
	constructor(private vergilService: VergilService) {
		super();
		this.vergilService.onLog((v) => {
			console.log(v);
			this.log.update((s) => (s += v));
		});
		this.vergilService.start();

		this.messages = [];
	}

	sendMessage() {
		let message = this.formGroup.getRawValue();
		this.messages.push(message.question);
		this.formGroup.reset();
		this.vergilService.chat(message).subscribe({
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
		this.formGroup = new FormGroup<{question: FormControl}>({
			question: new FormControl("", Validators.required),
		});
	}
}

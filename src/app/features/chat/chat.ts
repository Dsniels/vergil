/** @format */

import {Component, OnInit, signal, Signal} from "@angular/core";
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
import {NzButtonModule} from "ng-zorro-antd/button";

@Component({
	selector: "app-chat",
	imports: [
		NzButtonModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MarkdownModule,
		MarkdownComponent,
	],
	templateUrl: "./chat.html",
	styleUrl: "./chat.css",
})
export class Chat extends BaseComponent implements OnInit {
	messages!: string[];
	response = signal<string>("");
	question = "";
	formGroup!: FormGroup;
	constructor(private vergilService: VergilService) {
		super();
		this.vergilService.start();
		this.messages = [];
	}

	sendMessage() {
		let message = this.formGroup.getRawValue();
		this.messages.push(message.question);
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

/** @format */

import {Injectable, OnInit, signal} from "@angular/core";
import {
	HubConnection,
	HubConnectionBuilder,
	IStreamResult,
} from "@microsoft/signalr";
import {Message} from "./message.interface";
import {FileTransfer} from "./fileTransfer.interface";
import {FiletransferService} from "./filetransfer.service";

@Injectable({
	providedIn: "root",
})
export class SignalRService implements OnInit {
	connection!: HubConnection;
	log$ = signal<string>("");

	constructor(private fileTransferSvc: FiletransferService) {}

	ngOnInit(): void {
		this.connection = new HubConnectionBuilder()
			.withUrl("http://localhost:5233/assistant")
			.withAutomaticReconnect()
			.build();
	}

	async start() {
		this.connection.on("ReceiveLog", (args) => {
			this.log$.update((v) => (v += args));
		});
		this.connection.start().then(() => console.log("Connected"));
	}

	onLog(callback: (args: any[]) => void) {
		return this.connection.on("ReceiveLog", callback);
	}

	chat(message: Message): IStreamResult<string> {
		return this.connection.stream("AskSomething", message);
	}

	onFileDownload() {
		return this.connection.on("ReceiveFile", (args: FileTransfer) =>
			this.fileTransferSvc.downloadFile(args),
		);
	}
}

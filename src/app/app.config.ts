/** @format */

import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {MarkdownModule, provideMarkdown} from "ngx-markdown";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideMarkdown(),
		provideRouter(routes),
	],
};

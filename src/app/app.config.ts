/** @format */

import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {MarkdownModule, provideMarkdown} from "ngx-markdown";
import { provideNzConfig } from "ng-zorro-antd/core/config";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideMarkdown(),
		provideNzConfig({codeEditor:{useStaticLoading:true}}),
		provideRouter(routes),
	],
};

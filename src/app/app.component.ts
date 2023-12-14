import { Component } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
  <h1> Google Gemini pro </h1>
  <label>Type your prompt</label>
  <br><br>
  <input [(ngModel)]="prompt" placeholder="Enter your prompt here" />
  <button (click)="generate()" [disabled]="!prompt">Generate!</button>
  <br><br>
  @defer (when result) {
    {{ result }}
  }
  @placeholder {
    <span>Waiting for your prompt</span>
  }
  @loading(minimum 1s) {
    <span>Loading...</span>
  }
  `,
})
export class AppComponent {
  result = '';
  prompt = '';

  generativeAI = new GoogleGenerativeAI(environment.gemini_api_key);
  model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

  async generate() {
    try {
      const result = await this.model.generateContent(this.prompt);
      const response = result.response;
      this.result = response.text();
    } catch(e: any) {
      this.result = e;
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from '@app/components/parent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

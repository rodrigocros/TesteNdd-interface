import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderMaterialUIComponent } from './Features/header-material-ui/header-material-ui.component';

import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderMaterialUIComponent, ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TesteNdd-Web';
}

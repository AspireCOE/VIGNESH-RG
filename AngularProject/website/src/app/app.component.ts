import { Component, EnvironmentInjector, makeEnvironmentProviders } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerService } from './services/seller.service';
import { ProductService } from './services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './services/user.service';
provideHttpClient(withFetch());
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SellerAuthComponent,RouterOutlet,HeaderComponent,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService,SellerService,ProductService,FontAwesomeModule]
})
export class AppComponent {
  title = 'website';
}

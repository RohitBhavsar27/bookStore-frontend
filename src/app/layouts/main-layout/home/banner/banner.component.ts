import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
    bannerPath:string = "assets/banner.png"

    handleSubscribe(){
        Swal.fire({
            title: 'Subscribed!',
            text: 'You’re now  officially part of our book-loving family.',
            icon: 'success',
            timer: 2000, // ✅ Auto-close after 2 seconds
            showConfirmButton: false
        });
    }
}

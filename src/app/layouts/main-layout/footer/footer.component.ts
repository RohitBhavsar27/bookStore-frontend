import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-footer',
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    facebookIcon = faFacebook
    twitterIcon = faTwitter
    instagramIcon = faInstagram

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

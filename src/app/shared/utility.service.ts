import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquirymodalComponent } from './enquirymodal/enquirymodal.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  modalRef: any;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private router: Router, private modalService: NgbModal, public activeModal: NgbActiveModal) {

  }

  scrollToComponent(id: string) {
    this.modalService.open(EnquirymodalComponent, { size: 'lg', windowClass: 'modalWindowconfigurator ', centered: true, backdrop: 'static', keyboard: false });

  }
  close() {
    this.modalService.dismissAll()
  }

  scrollTo(id) {
    let el = document.getElementById(id);
    if (el == null) {


    } else {
      setTimeout(() => {
        let el = document.getElementById(id);
        if (el != null) {

          console.info(this.router.url)
          let topOfElement
          if (this.router.url == '' || this.router.url == '/') {
            topOfElement = el.offsetTop - 84;
          } else {
            topOfElement = el.offsetTop + 25;
          }
          // topOfElement = el.offsetTop+25;
          window.scroll({
            top: topOfElement,
            behavior: "smooth"
          });
          // el.scrollIntoView({
          //   behavior: 'smooth',
          //   block: 'start',
          //   inline: 'start',

          // });
        }

      }, 10);

    }


  }
}

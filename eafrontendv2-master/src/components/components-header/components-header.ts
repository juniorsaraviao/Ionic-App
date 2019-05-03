import { ElementRef, HostListener,Component, OnInit, Input } from '@angular/core';

/**
 * Generated class for the ComponentsHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-header',
  templateUrl: 'components-header.html',
  styleUrls:['/components-header.scss']
})
export class ComponentsHeaderComponent implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    
  }

  @Input() pageName:string;

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    
  }

}

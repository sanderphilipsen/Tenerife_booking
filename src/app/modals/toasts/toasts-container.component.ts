import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';



@Component({
  selector: 'app-toasts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngb-toast
      *ngFor="let toast of toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="remove(toast)"
    >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>
      <ng-template #text >{{toast.message}}</ng-template>
    </ngb-toast>
  `,
  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 3000'}
})
export class ToastsContainer implements OnChanges{
  @Input() message = "";
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.message != "")
      this.toasts.push( this.message,  { message: "Successfully added",classname: 'bg-success ', delay: 50000  });
  }

  public toasts: any[] = [];


  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }
}

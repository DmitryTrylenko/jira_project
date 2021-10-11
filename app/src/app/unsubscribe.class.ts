import { OnDestroy, Directive } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class Unsubscribable implements OnDestroy {
	protected unsubscribe: Subject<any> = new Subject();

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
import {ControlValueAccessor} from '@angular/forms';

/**
 * Example:
 *
 @Component({
    selector: 'je-md-input-view',
    templateUrl: './je-md-input-view.component.html',
    styleUrls: ['./je-md-input-view.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JeMdInputViewComponent),
            multi: true
        }
    ]
 })
 export class JeMdInputViewComponent extends ValueAccessorBase<string> implements OnInit {

     demoUpdate():void{
        this.value = "sdsdf";
     }

 }
 */
export abstract class ValueAccessorBase<T> implements ControlValueAccessor {

    private innerValue: T;

    onChange = (value: T) => {

    };

    onTouched = () => {
    };

    get value(): T {
        return this.innerValue;
    }

    set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            // informação da view para o  controller
            this.onChange(value);
            this.onChangeValue(value);
            this.onTouched();
        }
    }

    /**
     * methodo chamado em toda alteracao do valor, indicado para sobcrever ela no componente instanciado
     *
     * @param value
     */
    onChangeValue(value: T): void {

    }

    /**
     * responsavel por tratar as alterações feitas de fora
     * @param value
     */
    writeValue(value: T): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}

# srt-components

Development components for creating structured report templates to Sectra IDS7.

# Installing
In your project folder, execute:
```
npm install -s @sectra/srt-components
```

For styling to work you need to include the Bootstrap v3.4.1 CSS and
the `sectra-styling.css` in your project.

E.g., install Bootstrap
```bash
npm install --save bootstrap@3.4.1
```

Include the styles in your main javascript module:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@sectra/srt-components/dist/sectra-styling.css';
```

# Using the components
The package consists of the following components.
To use a component, import it with for example 'import { SectraRow } from "@sectra/srt-components"'.

## Sectra row
A row with a label placed to the left and the contained components to the right. The label can be left out, the component(s) will however always be positioned to the right.
All buttons in the group has the data-field-type="radio button"
### Props
**labelText**?: string - The text that should be placed to the left  
**labelFor**?: string - The id of the component the label should be for  
**marginTop**?: number - How big top-margin (in rem) (default is 1).  
**abbrTitle**: string - Displays labelText as abbr element and uses abbrTitle as title.
### Example
```
<SectraRow labelText="Size" labelFor="size" marginTop={2}>
    <input type="text" id="size">
</SectraRow>
```

## Sectra button group
A bootstrap button group that calls a callback when a new button is selected.  

### Props
**name**: string - Normal html name  
**buttonValues**: string[] - The values and text of the button options  
**defaultButton**?: string - The button that should be pressed from the start  
**onStateChange**?: (string) => void - The callback function to run when a new button is selected  
**justify**?: boolean - Removes the ```"btn-group-justified"``` class from the button group if false  
**disable**?: number[] - The indices of buttons that should be disabled within the button group
**preventOutput**?: boolean - If true, this component will not generate any report or json output
**(Any input or data- attribute)**

### Example
```<SectraButtonGroup name="Completed" buttonValues={["Yes", "No"]} defaultButton="Yes" onStateChange={this.someFunction} />```

## Sectra select
A dropdown that calls a callback when a new option is selected.
Has the data-field-type="selection_list".

### Props
**name**: string - Normal html name  
**optionValues**: string[] - The values and text of the select options  
**bsSize**?: string - can be anyone of "xs", "sm", "md", "lg" or "xl" where xl will cover the whole container (default "xl").  
**keys**?: string[] - Keys for react to identify the options. If provided, one key for each option value must be provided. If not provided, optionValues will be used as keys.  
**defaultOptionText**?: - If set, this option will be defaulted in the dropdown, however this option is not listed inside the dropdown. This should be used as a placeholder string, for example "Select an option..." If this is not used, the first option will be defaulted.  
**onStateChange**?: (string) => void - The callback function to run when a new option is selected  
**preventOutput**?: boolean - If true, this component will not generate any report or json output
**(Any select or data- attribute)**

### Example
```<SectraSelect name="Animal" optionValues={["Cat", "Dog", "Bird"]} defaultOptionText="Select an animal..." onStateChange={this.someFunction} />```

## Sectra input
An input element that can have different sizes.
Has the same data-field-type as the specified inputType prop.

### Props
**name**: string - Normal html name  
**type**: string - The html "type" attribute (e.g "text" or "number"). This prop will also be used for the data-field-type.  
**bsSize**?: string - can be anyone of "xs", "sm", "md", "lg" or "xl" where xl will cover the whole container (default "xl").  
**onInputChange**?: (val: string) => void - The callback function to run when input text is changed.  
**onInputBlur**?: (val: string) => void - The callback function to run when the input loses focus.  
**preventOutput**?: boolean - If true, this component will not generate any report or json output
**(Any input or data- attribute)**

### Example
```<SectraInput name="Length" inputType="number" size="xs" />```

## Sectra textarea
A simple textarea.
Has the data-field-type="textarea".

### Props
**name**: string - Normal html name.  
**onInputChange**?: (val: string) => void - The callback function to run when input text is changed.  
**onInputBlur**?: (val: string) => void - The callback function to run when the textarea loses focus.  
**preventOutput**?: boolean - If true, this component will not generate any report or json output.

### Example
```<SectraTextArea name="Comment" />```

## Sectra check button
A checkbox styled as a button.
Has the data-field-type="checkbox"

### Props
**name**: string - Normal html name.  
**value**: string - Value and text of the checkbutton.  
**checked**?: boolean - Set the check state of the button (default false).  
**onStateChange**?: (checked: boolean) => void - The callback function to run when the check button is toggled.  
**partOfGroup**?: boolean - If the checkbutton is part of a button group (default false but is automatically true if the parent is a SectraCheckButtonGroup). 
**preventOutput**?: boolean - If true, this component will not generate any report or json output.

### Example
```<SectraCheckButton name="Include comment" value="Include comment">```

## Sectra check button group
Checkbuttons inside this component will be formed as a button group.

### Example
```
<SectraCheckButtonGroup>
    <SectraCheckButton name="Year 2018" value="2018" />
    <SectraCheckButton name="Year 2019" value="2019" />
</SectraCheckButtonGroup>
```

## Sectra canvas
A canvas where you can paint, the image is saved as base 64 png which can be used to send the image to PACS Dicom.

### Props
**id**: string - Identifier of this canvas.
**width**?: number - Width of canvas in px (default 500)  
**height**?: number - Height of canvas in px (default 400)  
**backgroundColor**?: string - Color of canvas background in hex. (default "#FFFFFF")  
**paintColor**?: string - Color to paint in the canvas with. (default "#fd4545")  
**defaultImage**?: string - Base64 encoded image that will be loaded into the canvas
**paintType**?: "Brush" | "Spray" - Type of tool to paint with. (default "Brush")
**onPaint**?: (imageData: ImageData) => void - Called on mouse release.
**(Any canvas or data- attribute)**

### Example
```<SectraCanvas id="canvas-id"/>```

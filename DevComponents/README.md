# Structured Reporting Development Components
This resource contains basic components with styling and a demo template that uses them.

The components used in this template will be published to npm in the future. 

# Getting started
1. Clone or download the repo.
2. Copy this folder (DevComponents) to a place where you want to develop the new template
3. Build the template (See build instructions in the StructuredReportingTemplatesDevResources root folder.)

# Using the components
The package consists of the following components.

## Sectra row
A row with a label placed to the left and the contained components to the right. The label can be left out, the component(s) will however always be positioned to the right.
All buttons in the group has the data-field-type="radio button"
### Props
**labelText**?: string - The text that should be placed to the left  
**labelFor**?: string - The id of the component the label should be for  
**marginTop**?: number - How big top-margin (in rem) (default is 1).  

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

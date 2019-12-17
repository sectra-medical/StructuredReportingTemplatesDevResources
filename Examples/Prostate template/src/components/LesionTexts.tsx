import * as React from "react";

export class LesionTexts extends React.Component<{}, {}>{
    public static T2_TEXTS = {peripheral: [
        "Uniform hyperintense signal intensity (normal)",
        "Linear or wedge-shaped hypointensity or diffuse mild hypointensity, usally indistinct margin",
        "Heterogeneous signal intensity or non-circumscribed, rounded, moderate hypointensity (Includes others that do not qualify as 2, 4 or 5)",
        "Circumscribed, homogenous moderate hypointense focus/mass confined to prostate and <1.5 cm in greatest dimension",
        "Circumscribed, homogenous moderate hypointense focus/mass confined to prostate and >=1.5 cm in greatest dimension or definite extraprostatic extension/invasive behavior"
    ],
    transition: [
        "Homogeneous intermediate signal intensity (normal)",
        "Circumscribed hypointense or heterogeneous encapsulated nodule(s) (BPH)",
        "Heterogeneous signal intensity with obscured margins (Includes others that do not qualify as 2, 4 or 5)",
        "Lenticular or non-circumscribed, homogeneous, moderately hypointense, and <1.5 cm in greatest dimension",
        "Lenticular or non-circumscribed, homogeneous, moderately hypointense, and >=1.5 cm in greatest dimension or definite extraprostatic extension/invasive behavior"
    ]}

    public static DWI_TEXTS = [
        "No abnormality (i.e normal) on ADC and high b-value DWI",
        "Indistinct hypointense on ADC",
        "Focal mildly/moderately hypointense on ADC and isointense/mildly hyperintense on high b-value DWI",
        "Focal markedly hypointense on ADC and markedly hyperintense on high b-value DWI; <1.5cm in greatest dimension",
        "Focal markedly hypointense on ADC and markedly hyperintense on high b-value DWI; >=1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior"
    ]

    public static PIRADS_TEXTS = [
        "Very low (clinically significant cancer is highly unlikely to be present)",
        "Low (clinically significant cancer is unlikely to be present)",
        "Intermediate (the presence of clinically significant cancer is equivocal)",
        "High (clinically significant cancer is likely to be present)",
        "Very high (clinically significant cancer is highly likely to be present)"
    ]
}
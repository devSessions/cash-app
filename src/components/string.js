import LocalizedStrings from "react-native-localization";

let strings = new LocalizedStrings({
  "en-US": {
    status: "CASH IDENTIFER",
    cash: "With AI",
    buttonString: "Touch to Capture",
    computing: "COMPUTING",
    computingLoading: "Please Wait...",
    detected: "DETECTED",
    error: "ERROR",
    wentWrong: "Something Went Wrong"
  },
  ne: {
    status: "नदग पहिचान",
    cash: "कृत्रिम बुद्धि द्वारा",
    buttonString: "कैप्चर गर्न छुनुहोस्",
    computing: "हिसाब गरिदै",
    computingLoading: "पर्खिनुहोस",
    detected: "पत्ता लाग्यो",
    error: "त्रुटि",
    wentWrong: "केहि गलत भयो"
  }
});

export default strings;

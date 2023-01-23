export const BASEURL = "https://geektrust.s3.ap-southeast-1.amazonaws.com";

export const FILTER_CATEGORY = [
    {
      id: 0,
      type: "Color",
      options: [
        {
          key: "Red",
          value: false
        },
        {
          key: "Blue",
          value: false
        },
        {
          key: "Green",
          value: false
        }
      ]
    },
    {
      id: 1,
      type: "Gender",
      options: [
        {
          key: "Men",
          value: false
        },
        {
          key: "Women",
          value: false
        }
      ]
    },
    {
      id: 2,
      type: "Price",
      options: [
        {
          key: "0 - Rs. 250",
          from: 0,
          to: 250,
          value: false
        },
        {
          key: "Rs. 251 - 450",
          from: 251,
          to: 450,
          value: false
        },
        {
          key: "Rs. 451 & above",
          from: 451,
          to: "Number.MAX_VALUE",
          value: false
        }
      ]
    },
    {
      id: 3,
      type: "Type",
      options: [
        {
          key: "Polo",
          value: false
        },
        {
          key: "Hoodie",
          value: false
        },
        {
          key: "Basic",
          value: false
        }
      ]
    }
  ];
  
  


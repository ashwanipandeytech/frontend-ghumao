export class Destination {
    "_id": string;
    "DestinationId": number;
    "DestinationName": string;
    "Image": string;
    "DestinationSlug": string;
    "Keys":[{
        "Key":{
            type: string
        }
    }];
    "Hotel": string;
    "StateId": string;
    "Sightseeing": [{
        "Name":{
            type: string
        }
    }];
    "IsActive": boolean;
    "CreatedBy": string;
    "CreatedOn": string;
    "__v": number;
}
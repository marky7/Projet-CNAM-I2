import { Asset } from './org.hyperledger.composer.system';
import { Participant } from './org.hyperledger.composer.system';
import { Transaction } from './org.hyperledger.composer.system';
import { Event } from './org.hyperledger.composer.system';


export class User extends Participant {
    userId: String;
    firstname: String;
    lastname: String;
    organisation: String;
    login: String;
    password: String;
    phone: String;
    email: String;
    roles: String;
    creationDate: Date;
}

export class Customer extends User {
}

export class Provider extends User {
}

export class Tag extends Asset {
    tagId: String;
    valeur: String;
    creationDate: Date;
}

export class Attachment extends Asset {
    attachmentId: string;
    name: string;
    path: Date;
    creationDate: Date;
    package: Package;
}

export class Product extends Asset {
    productId: string;
    description: string;
    creationDate: Date;
    deliveryDate: Date;
}

export class Package extends Asset {
    packageId: String;
    description: string;
    creationDate: Date;
    deliveryDate: Date;
    customer: Customer;
    provider: Provider;
    tag: Tag;
    attachments: Attachment[];
    products: Product[];
}

export class Alert extends Asset {
    alertId: String;
    description: String;
    type: String;
    status: String;
    creationDate: Date;
    users: User[];
    package: Package;
  }
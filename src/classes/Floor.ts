import Room from './Room';

export default class Floor {

    image_url!: string;
    rooms!: Array<Room>;

    // https://stackoverflow.com/a/37682352
    constructor(init?:Partial<Floor>) {
        Object.assign(this, init);
    }

}

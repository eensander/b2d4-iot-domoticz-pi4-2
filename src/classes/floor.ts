import Room from './room';

export default class Floor {

    image_url!: string;
    rooms!: Array<Room>;

    // https://stackoverflow.com/a/37682352
    constructor(init?:Partial<Room>) {
        Object.assign(this, init);
    }

}

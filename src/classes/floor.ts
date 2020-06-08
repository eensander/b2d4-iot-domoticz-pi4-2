import Room from './room';

export default class Floor {

    image_url: string;
    rooms: Array<Room>;

    constructor(image_url: string, rooms: Array<Room>) {

        this.image_url = image_url;
        this.rooms = rooms;

    }

}

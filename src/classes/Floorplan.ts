import Room from './Room';

export default abstract class Floorplan {

    image_url: string = '';
    rooms: Array<Room> = [];

    landing_room_name: string | null = null;

}

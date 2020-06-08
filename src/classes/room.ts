export default class Room {

    name: string;
    points: string;
    adjacent_rooms: Array<string>;

    constructor(name: string, points: string, adjacent_rooms: Array<string>) {

        this.name = name;
        this.points = points;
        this.adjacent_rooms = adjacent_rooms;

    }

    can_go_to(room: Room) {
        return this.adjacent_rooms.includes(room.name);
    }

}

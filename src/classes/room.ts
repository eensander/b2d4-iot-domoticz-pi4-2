export default class Room {

    public name!: string;
    public points!: string;
    public adjacent_rooms!: Array<string>;

    // https://stackoverflow.com/a/37682352
    constructor(init?:Partial<Room>) {
        Object.assign(this, init);
    }

    can_go_to(room: Room) {
        console.log([this.name, this.adjacent_rooms]);
        return this.adjacent_rooms.includes(room.name);
    }

}

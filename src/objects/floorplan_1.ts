import Room from '@/classes/Room';
import Floor from '@/classes/Floor';

export const floorplan_1 = new Floor({
    image_url: '/floorplan-1.gif',
    rooms: [
        new Room({
            name: 'WJ.C.',
            points: '100,100 308,100 308,159 295,159 294,208 100,208',
            adjacent_rooms: [
                'MASTER BATH',
            ],
            domoticz_id: 5,
        }),
        new Room({
            name: 'MASTER SUITE',
            points: '52,214 296,214 296,401 52,401',
            adjacent_rooms: [
                'MASTER BATH',
                'BREAKFAST',
                'COVERED PORCH',
            ],
            domoticz_id: 2,
        }),
        new Room({
            name: 'MASTER BATH',
            points: '313,101 406,101 406,167 432,167 432,312 301,312 301,166 314,166',
            adjacent_rooms: [
                'WJ.C.',
                'MASTER SUITE',
            ],
            domoticz_id: 3,
        }),
        new Room({
            name: 'LNDRY',
            points: '412,102 532,102 532,206 439,206 439,159 412,159',
            adjacent_rooms: [
                'MUD RM',
            ],
            domoticz_id: 4,
        }),
        new Room({
            name: 'MUD RM',
            points: '441,216 535,216 535,310 440,310',
            adjacent_rooms: [
                'LNDRY',
                'KITCHEN',
                '3-CAR GARAGE',
            ],
            domoticz_id: 6,
        }),
        new Room({
            name: '3-CAR GARAGE',
            points: '541,101 825,101 825,329 802,329 802,461 541,461',
            adjacent_rooms: [
                'MUD RM',
            ],
            domoticz_id: 7,
        }),
        new Room({
            name: 'COVERED PORCH',
            points: '90,414 175,414 175,549 285,549 285,719 90,719',
            adjacent_rooms: [
                'MASTER SUITE',
                'FAMILY ROOM',
                'BEDROOM 2',
                'BEDROOM 3',
            ],
            domoticz_id: 8,
        }),
        new Room({
            name: 'BREAKFAST',
            points: '183,407 340,407 340,540 183,540',
            adjacent_rooms: [
                'MASTER SUITE',
                'KITCHEN',
                'FAMILY ROOM',
            ],
            domoticz_id: 9,
        }),
        new Room({
            name: 'KITCHEN',
            points: '359,315 535,315 535,462 547,462 547,520 359,520 ',
            adjacent_rooms: [
                'MUD RM',
                'BREAKFAST',
                'FAMILY ROOM',
                'DINING',
            ],
            domoticz_id: 10,
        }),
        new Room({
            name: 'FAMILY ROOM',
            points: '306,546 614,546 614,622 547,622 547,708 306,708',
            adjacent_rooms: [
                'KITCHEN',
                'BREAKFAST',
                'BEDROOM 2',
                'BEDROOM 3',
                'COVERED PORCH',
                'BEDROOM 4',
                'GREETING HALL',
            ],
            domoticz_id: 11,
        }),
        new Room({
            name: 'DINING',
            points: '623,468 778,468 778,544 803,544 803,616 625,616',
            adjacent_rooms: [
                'KITCHEN',
                'GREETING HALL',
            ],
            domoticz_id: 12,
        }),
        new Room({
            name: 'GREETING HALL',
            points: '556,630 870,630 870,710 556,710',
            adjacent_rooms: [
                'DINING',
                'FAMILY ROOM',
                'LIBRARY/BEDROOM 5',
                'LIVING ROOM',
                'ENTRY PORCH'
            ],
            domoticz_id: 13,
        }),
        new Room({
            name: 'ENTRY PORCH',
            points: '814,546 950,546 950,792 874,792 874,615 814,615',
            adjacent_rooms: [
                'GREETING HALL',
            ],
            domoticz_id: 14,
        }),
        new Room({
            name: 'LIVING ROOM',
            points: '720,720 865,720 865,875 720,875',
            adjacent_rooms: [
                'GREETING HALL',
            ],
            domoticz_id: 15,
        }),
        new Room({
            name: 'LIBRARY/BEDROOM 5',
            points: '582,720 715,720 715,878 582,878',
            adjacent_rooms: [
                'GREETING HALL',
            ],
            domoticz_id: 16,
        }),
        new Room({
            name: 'BEDROOM 4',
            points: '407,804 547,804 547,851 575,851 575,938 407,938',
            adjacent_rooms: [
                'FAMILY ROOM',
            ],
            domoticz_id: 17,
        }),
        new Room({
            name: 'BEDROOM 3',
            points: '255,789 298,789 298,798 400,798 400,938 255,938',
            adjacent_rooms: [
                'COVERED PORCH',
                'FAMILY ROOM',
                'BEDROOM 2',
            ],
            domoticz_id: 18,
        }),
        new Room({
            name: 'BEDROOM 2',
            points: '55,789 244,789 244,936 55,936',
            adjacent_rooms: [
                'COVERED PORCH',
                'BEDROOM 3',
                'FAMILY ROOM',
            ],
            domoticz_id: 19,
        }),
    ],
});

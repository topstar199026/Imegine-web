import Dexie from 'dexie';

import { getGroupData2 } from 'src/actions/contactAction';
export class AppDatabase extends Dexie {

    messages: Dexie.Table<Message, number>;
    groups: Dexie.Table<Group, number>;

    constructor() {

        super("ImegineDatabase");

        var db = this;

        db.version(1).stores({
            messages: '++id, messageId, sender, receiver.id, message, messageType, readAt, readBy, editAt, editBy, deleteAt, deleteBy, createdAt, updatedAt',
            groups: 'id, groupName, groupImage, lastMessage, lastDate, newMessage, draft, hashKey, memberId, member, memberCount, _private, active, status, createdAt, updatedAt',
        });
        db.messages.mapToClass(Message);
        db.groups.mapToClass(Group);
    }
}

export interface Sender {
    id: number,
    userId: string,
    nickName: string,
    avatar: string,
}

export interface Receiver {
    id: number,
}

export interface MailTo {
    id: number,
    contactId: string,
}

export class Message {
    id: number;
    messageId: number;
    sender: Sender;
    receiver: Receiver;
    mailTo: MailTo[];
    subject: string;
    message: string;
    messageType: number;
    readAt: Date;
    readBy: boolean;
    editAt: Date;
    editBy: boolean;
    deleteAt: Date;
    deleteBy: boolean;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(
            messageId: number,
            sender: Sender,
            receiver: Receiver,
            mailTo: MailTo[],
            subject: string,
            message: string,
            messageType: number,
            readAt: Date,
            readBy: boolean,
            editAt: Date,
            editBy: boolean,
            deleteAt: Date,
            deleteBy: boolean,
            createdAt: Date,
            updatedAt: Date,
            id?:number
        ) {
        this.messageId = messageId;
        this.sender = sender;
        this.receiver = receiver;
        this.mailTo = mailTo;
        this.subject = subject;
        this.message = message;
        this.messageType = messageType;
        this.readAt = readAt;
        this.readBy = readBy;
        this.editAt = editAt;
        this.editBy = editBy;
        this.deleteAt = deleteAt;
        this.deleteBy = deleteBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (id) this.id = id;        
    }
 
    save() {
        return db.transaction('rw', db.messages, async() => {
            
            // Add or update our selves. If add, record this.id.
            this.id = await db.messages.put(this);

            await Promise.all([
               
            ]);
        });
    }
}



export interface Member {
}
export class Group {

    id: number;
    groupName: string;
    groupImage: string;
    lastMessage: string;
    lastDate: Date;
    newMessage: number;
    draft: string;
    hashKey: number;
    memberId: string;
    member: Member;
    memberCount: number;
    _private: boolean;
    active: boolean;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        groupName: string,
        groupImage: string,
        lastMessage: string,
        lastDate: Date,
        newMessage: number,
        draft: string,
        hashKey: number,
        memberId: string,
        member: Member,
        memberCount: number,
        _private: boolean,
        active: boolean,
        status: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.groupName = groupName;
        this.groupImage = groupImage;
        this.lastMessage = lastMessage;
        this.lastDate = lastDate;
        this.newMessage = newMessage;
        this.draft = draft;
        this.hashKey = hashKey;
        this.memberId = memberId;
        this.member = member;
        this.memberCount = memberCount;
        this._private = _private;
        this.active = active;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    save() {
        return db.transaction('rw', db.groups, async() => {
            
            // Add or update our selves. If add, record this.id.
            this.id = await db.groups.put(this);

            await Promise.all([
               
            ]);
        });
    }
}

export async function getMessageList (data: any) {
    return await db.transaction('r', [db.messages], async () => {
        switch (data.activeType) {
            case 0:
                return await db.messages.where('receiver.id').equals(data.groupId).sortBy('messageId');
            case 1:
                return await db.messages.where('receiver.id').equals(data.groupId).and(item => item.messageType === 0).sortBy('messageId');
            case 2:
                return await db.messages.where('receiver.id').equals(data.groupId).and(item => item.messageType === 5).sortBy('messageId');
        }
    }); 
}

export async function saveReadState (data: any, device: any) {

    await db.transaction('rw', [db.messages], async () => {
        await db.messages.where('messageId').belowOrEqual(data.messageId)
                            .and(item => item.readBy === false)
                            .and(item => item.receiver.id === data.group.id)
                            .and(item => item.sender.id === device.UserId)
                            .modify({
                                readBy: true,
                                readAt: data.date,
                            });
    }); 
}

// export async function saveMessage (str: string = '') {
//     return await db.transaction('r', [db.messages], async () => {
//         return await db.messages.where('id').above(0).sortBy('createdAt');
//     }); 
// }

export async function saveMessage (data: any) {
    await db.transaction('rw', db.messages, async function () {

        db.messages.add(new Message(
            data.messageId,
            {
                id: data.sender.id,
                userId: data.sender.userId,
                nickName: data.sender.nickName,
                avatar: data.sender.avatar,
            },
            {
                id: data.group.id,
            },
            data.receiver ? data.receiver : [],
            data.subject ? data.subject : '',
            data.message,
            data.messageType,
            data.date,
            false,
            data.date,
            false,
            data.date,
            false,
            data.date,
            data.date
        ));
    });
}

export async function savePendingMessage (dataArr: any) {
    db.transaction('rw', db.messages, async function () {
        var arr = [];

        for(var i=0; i<dataArr.length; i++) {
            var data = dataArr[i];
            arr.push(
                new Message(
                    data.messageId,
                    {
                        id: data.sender.id,
                        userId: data.sender.userId,
                        nickName: data.sender.nickName,
                        avatar: data.sender.avatar,
                    },
                    {
                        id: data.group.id,
                    },
                    data.receiver ? data.receiver : [],
                    data.subject ? data.subject : '',
                    data.message,
                    data.messageType,
                    data.date,
                    false,
                    data.date,
                    false,
                    data.date,
                    false,
                    data.date,
                    data.date
                )
            )
        }
        console.log('bulk message data', arr)
        db.messages.bulkAdd(arr);
        // db.messages.add(new Message(
        //     data.messageId,
        //     {
        //         id: data.sender.id,
        //         userId: data.sender.userId,
        //         nickName: data.sender.nickName,
        //         avatar: data.sender.avatar,
        //     },
        //     {
        //         id: data.group.id,
        //     },
        //     data.message,
        //     data.messageType,
        //     data.date,
        //     false,
        //     data.date,
        //     false,
        //     data.date,
        //     false,
        //     data.date,
        //     data.date
        // ));
    });
}

export async function loadGroupList () {
    return await db.transaction('r', [db.groups], async () => {
        return await db.groups.toArray();
    }); 
}

export async function getGroup (id: number) {
    return await db.transaction('r', [db.groups], async () => {
        return await db.groups.get(id * 1);
    }); 
}

function hashCode (str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function getIdArrayString (arr) {
    let str = '';
    for(var i=0; i<arr.length; i++) {
        console.log(arr[i])
        let _s = i===0 ? '': ',';
        str = str + _s + arr[i];
    }
    return str;
}

function getObjectUserId (arr) {
    const _t = {};
    for(var i=0; i<arr.length; i++) {
        _t['user' + i.toString()] = arr[i];
    }
    return _t;
}

export async function getGroup2 (device: any, contactUserInfo: any) {
    const idArr = [
        device.deviceUserId,
        contactUserInfo.userId,
    ];
    idArr.sort();

    let userIdStr = getIdArrayString(idArr);
    let hashKey = hashCode(userIdStr);

    console.log(idArr, userIdStr, hashKey); 


    return await db.transaction('r', [db.groups], async () => {
        var query = db.groups.where({hashKey: hashKey});
        for(let i=0; i<idArr.length; i++) {
            query = query.and(item => item.member['user' + i.toString()] === idArr[i]);
        }
        var res = await query.toArray();
        if(res.length === 0) return null;
        else return res[0];
    }); 
}

export async function saveGroup (data: any) {
    await db.transaction('rw', [db.groups], async () => {
        db.groups.add(new Group(
            data.id,
            data.groupName,
            data.groupImage,
            data.lastMessage,
            data.newMessage,
            data.updated_at,
            data.draft,
            data.hashKey,
            data.memberId,
            data.member,
            data.memberCount,
            data.private,
            data.active,
            data.status,
            data.created_at,
            data.updated_at,
        ));
    }); 
}

export async function updateGroup(key: any, data: any) {
    console.log('update group----', data)
    let groupId = data.group.id;
    var groupData = await getGroup(groupId);

    console.log('groupData', groupData)
    if(groupData) {

    } else {
        var groupData2 = await getGroupData2(key, groupId);
        console.log('groupData2', groupData2)
        if(groupData2 && groupData2.status === true) {
            groupData = await getGroup(groupId);
        }
    }

    console.log('groupData3', groupData)

}

export var db = new AppDatabase();
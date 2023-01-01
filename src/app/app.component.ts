import { Component, OnInit } from '@angular/core';
import { Channel, Client, Message } from 'twilio-chat';
import * as Twilio from 'twilio-chat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'TwilioApp';
  // public user = {
  //   name: 'Dustin',
  //   avatar: 'https://randomuser.me/api/portraits/men/30.jpg'
  // };
  // public contact = {
  //   name: 'Kylie',
  //   avatar: 'https://randomuser.me/api/portraits/women/76.jpg'
  // };

  // messages: any[] = [];
  // textInput: string = '';
  // client: Client;
  // channel: Channel;

  // ngOnInit()
  // {
  //   let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI0NjUwMjgiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTM2Y2NzRjOWJjNTdlNDhiOTgzOWJlYWFkYzYxZTQ3YjcifX0sImlhdCI6MTY3MjQ2NTAyOCwiZXhwIjoxNjcyNDY4NjI4LCJpc3MiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.w1-anDJ-0aLmYRc7YjAtRyP_32svzMtid3WFz20w49w';
  //   let channelSid = 'f69c603f-a655-b234-c5fc-e81a659f3430';
  //   // let clientOptions: Twilio.Client['Options'] = { logLevel: 'debug' };
  //   Twilio.Client.create(token).then((client: Client) => {
  //     this.client = client;
  //     client.getChannelByUniqueName(channelSid).then((channel: Channel) => {
  //       channel.on('messageAdded', (message: Message) => {
  //         console.log('messageAdded called from Chat service');
  //       });
  //     });
  //   });
  // }

  // msg(user: { name: string; avatar: string; }, contact: { name: string; avatar: string; }, message: string, timestamp = Date.now()) {
  //   return {
  //     user,
  //     contact,
  //     message,
  //     timestamp
  //   };
  // }
  // addFromSender(msg: string) {
  //   return this.msg(this.user, this.contact, msg);
  // }

  // addFromReceiver(msg: any) {
  //   return this.msg(this.contact, this.user, msg);
  // }

  // send() {
  //   if (this.textInput == '') return;

  //   this.messages.push(this.addFromSender(this.textInput));
  //   this.textInput = '';
  // }



}

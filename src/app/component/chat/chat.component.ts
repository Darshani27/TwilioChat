import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ChatService } from 'src/app/shared/chat.service';
import { Channel, Message } from 'twilio-chat';
import * as Twilio from 'twilio-chat';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

  public isConnected: boolean = false;
  public isConnecting: boolean = false;
  public isGettingChannels: boolean = false;
  public channels: any[] = [];
  public channelObj: any;
  public chatMessage!: string;
  public currentChannel: Channel;
  public typeObservable: any;
  public messages: Message[] = [];
  public currentUsername: string = localStorage.getItem('twackUsername') as any;
  public isMemberOfCurrentChannel: boolean = false;
  public membersTyping: any = [];

  private conSub: any;
  private disconSub: any;

  @ViewChild('chatElement') chatElement: any;
  @ViewChild('chatDisplay') chatDisplay: any;

  constructor(private chatService:ChatService,private authService:AuthService) { }

  ngOnInit(): void {
    this.isConnecting = true;
    const user=localStorage.getItem('twackToken');
    this.chatService.connect(user as any);
    this.conSub= this.chatService.chatConnectedEmitter.subscribe( (res:any) => {
      this.isConnected = true;
      this.isConnecting = false;
      console.log(res);
      this.isGettingChannels=true;
      this.getChannels();
      this.chatService.chatClient.on('channelAdded', () => {
        this.getChannels();
      });
      this.chatService.chatClient.on('channelRemoved', () => {
        this.getChannels();
      });
      this.chatService.chatClient.on('tokenExpired', () => {
        this.authService.refreshToken();
      });
    })

   this.disconSub=this.chatService.chatDisconnectedEmitter.subscribe( () => {
      this.isConnecting = false;
      this.isConnected = false;
    });
  }
  getChannels() {
    this.isGettingChannels = true;
    this.chatService.getPublicChannels().then( (channels: any) => {
      this.channelObj = channels;
      this.channels = this.channelObj.items;
      console.log(channels);
      this.isGettingChannels = false;
    });
  }

  leaveChannel() {
    if( this.typeObservable ) {
      this.typeObservable.unsubscribe();
    }
    if( this.currentChannel ) {
      return this.currentChannel.leave().then( (channel: Channel) => {
        channel.removeAllListeners('messageAdded');
        channel.removeAllListeners('typingStarted');
        channel.removeAllListeners('typingEnded');
      });
    }
    else {
      return Promise.resolve();
    }
  }

  enterChannel(sid: string) {
    this.messages = [];
    this.membersTyping = [];

    this.leaveChannel()
      .then(() => {
        this.chatService.getChannel(sid).then( channel => {
          this.currentChannel = channel;
          console.log(channel);
          this.currentChannel.join()
            .then( r => {
              this.initChannel();
            })
            .catch( e => {
              if( e.message.indexOf('already exists') > 0 ) {
                this.initChannel();
              }
            });
        }).catch((err)=>{
          console.log(err); 
        }
        );
      });
  }
  initChannel() {
    this.typeObservable = fromEvent(this.chatElement.nativeElement, 'keyup').pipe(debounceTime(100)).subscribe( () => {
      this.typing();
    });

    this.currentChannel.on('messageAdded', (m) => {
      this.messages.push(m);
      const el = this.chatDisplay.nativeElement;
      setTimeout( () => {
        el.scrollTop = el.scrollHeight;
      });
    });
    this.currentChannel.on('typingStarted', (m) => {
      this.membersTyping.push(m);
    });
    this.currentChannel.on('typingEnded', (m) => {
      const mIdx = this.membersTyping.findIndex( (mem: { identity: string; }) => mem.identity === m.identity );
      this.membersTyping = this.membersTyping.splice(mIdx, 0);
    });
  }

  typing() {
    this.currentChannel.typing();
  }

  whosTyping() {
    return this.membersTyping.map( (m:any) => {
      if( m.identity !== this.currentUsername ) {
        return m.identity;
      }
    }).join(', ');
  }

sendMessage() {
  this.currentChannel?.sendMessage(this.chatMessage);
  this.chatMessage = '';
}

  createChannel() {
    this.chatService.createChannel(`Channel ${this.channels.length+1}`);
    return false;
  }

  ngOnDestroy() {
    this.conSub.unsubscribe();
    this.disconSub.unsubscribe();
  }

}

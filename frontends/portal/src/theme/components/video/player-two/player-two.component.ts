import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '../../../../core/common/video/video.service';
import { UserService } from '../../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

declare var OvenPlayer: any; // Declare OvenPlayer


@Component({
  selector: 'app-player-two',
  templateUrl: './player-two.component.html',
  styleUrl: './player-two.component.scss'
})
export class PlayerTwoComponent implements OnInit, OnDestroy {
  videoSource!: string;
  user!: any;
  player: any;


  constructor(private videoService: VideoService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];

      // Fetch public information
      this.userService.allUsers().subscribe(users => {
        this.user = users.find(user => user.username === username);
        this.initializePlayer();
      });
    });
    this.userService.getProfile().subscribe(user => {
      this.user = user;
      if (this.user && this.user.stream && this.user.stream.streamKey) {
        this.videoService.getLiveStreamUrl(this.user.stream.streamKey).subscribe(url => {
          this.videoSource = url;
          this.initializePlayer();
        });
      }
    });
  }

  initializePlayer(): void {
    if (this.user && this.user.stream && this.user.stream.streamKey) {
      this.player = OvenPlayer.create('player_id', {
        sources: [
          {
            file: `wss://161.35.40.48:3334/live/${this.user.stream.streamKey}`, // replace with your actual OME host and port
            type: 'webrtc',
            label: 'webrtc',
          },
        ],
        poster: this.user.profile.cover, // replace with the actual path to the cover image
        autoStart: true // Add this line
      });

      // Add an error event handler
      this.player.on('error', () => {
        // Get the player element
        const playerElement = document.getElementById('player_id');
        if (playerElement) {
          // Hide the player
          playerElement.style.display = 'none';
        }

        // Show the cover image
        const coverImage = document.getElementById('cover_image') as HTMLImageElement;
        if (coverImage) {
          coverImage.src = this.user.profile.cover;
          coverImage.style.display = 'block';
        }
      });
    }
  }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.remove();
    }
  }
}

import { Component, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'create_video_js';
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;
  isPlaying: boolean = false;
  savedTime?: number = 0;
  player: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.player = videojs(this.videoPlayerRef.nativeElement);
  }

  playPauseVideo(): void {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  restorePosition(): void {
    this.player.currentTime(this.savedTime);
  }

  ngOnDestroy(): void {
    this.savedTime = this.player.currentTime();
    this.player.dispose();
  }

  previousButton() {
    const currentTime = this.player.currentTime();
    this.player.currentTime(Math.max(0, currentTime - 10));
  }

  forwardButton() {
    const currentTime = this.player.currentTime();
    this.player.currentTime(Math.max(0, currentTime + 10));
  }

  toggleFullScreen(): void {
    if (this.player.requestFullscreen) {
      this.player.requestFullscreen();
    }
  }
}

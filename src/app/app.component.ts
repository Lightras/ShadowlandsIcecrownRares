import {Component, OnInit} from '@angular/core';
import {NzCheckBoxOptionInterface} from 'ng-zorro-antd/checkbox';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
   hoursFix = 3; // girl's table time minus UTC time
   inHourFrequency = 3;
   bossCount = 20;
   startDate = 11;
   fightDuration = 4;

   rares: Rare[] = new Array(20);
   currentRare: Rare;

   isCurrentOnly: boolean;
   isShowNames = true;
   isHideElements: boolean;
   isShowCoords: boolean;
   nextSpawnTime = {
      hours: null,
      minutes: null,
      dateObj: null
   };

   preferences: NzCheckBoxOptionInterface[] = [
      { label: 'Show the next only', value: 'isCurrentOnly' },
      { label: 'Show names', value: 'isShowNames', checked: true },
      { label: 'Show coordinates', value: 'isShowCoords' },
      { label: 'Show map only', value: 'isHideElements' }
   ]

   log(v) {
   }

   ngOnInit() {
      this.rares = fillRares();
      this.setCurrent();
   }

   setCurrent() {
      const now = new Date();
      const min = now.getUTCMinutes();
      const hour = now.getUTCHours();
      this.nextSpawnTime.hours = hour;
      const day = now.getUTCDate();

      const daysOffset = day - this.startDate;
      let inDayIndex = (hour + this.hoursFix) * this.inHourFrequency;

      let inHourIndex;
      if (min < this.fightDuration) {
         inHourIndex = 0;
         this.nextSpawnTime.minutes = 1;
      } else if (min < 20 + this.fightDuration) {
         inHourIndex = 1;
         this.nextSpawnTime.minutes = 21;
      } else if (min < 40 + this.fightDuration) {
         inHourIndex = 2;
         this.nextSpawnTime.minutes = 41;
      } else {
         inHourIndex = 0;
         inDayIndex += 3;
         this.nextSpawnTime.hours += 1;
         this.nextSpawnTime.minutes = 1;
      }

      const index = inDayIndex + inHourIndex;
      const bossIndex = (daysOffset * 24 * this.inHourFrequency + index) % this.bossCount;

      this.currentRare =  this.rares[bossIndex];

      const nextSpawnDate = (new Date());
      nextSpawnDate.setUTCHours(this.nextSpawnTime.hours);
      nextSpawnDate.setMinutes(this.nextSpawnTime.minutes);
      this.nextSpawnTime.dateObj = nextSpawnDate;
   }
}

function fillRares() {
   const rares = new Array(20);

   rares[0] = {
      name: 'The Prophet Tharon\'ja',
      coords: [80.1, 61.2]
   };

   rares[1] = {
      name: 'Novos the Summoner',
      coords: [77.8, 66.1]
   };

   rares[2] = {
      name: 'Trollgore',
      coords: [58.3, 39.4]
   };

   rares[3] = {
      name: 'Krik\'thir the Gatewatcher',
      coords: [67.5, 58.0]
   };

   rares[4] = {
      name: 'Prince Taldaram',
      coords: [29.6, 62.2]
   };

   rares[5] = {
      name: 'Elder Nadox',
      coords: [44.2, 49.1]
   };

   rares[6] = {
      name: 'Noth the Plaguebringer',
      coords: [31.6, 70.5]
   };

   rares[7] = {
      name: 'Patchwerk',
      coords: [36.5, 67.4]
   };

   rares[8] = {
      name: 'Blood Queen Lana\'thel',
      coords: [49.7, 32.7]
   };

   rares[9] = {
      name: 'Professor Putricide',
      coords: [57.1, 30.3]
   };

   rares[10] = {
      name: 'Lady Deathwhisper',
      coords: [51.1, 78.5]
   };

   rares[11] = {
      name: 'Skadi the Ruthless',
      coords: [57.8, 56.1]
   };

   rares[12] = {
      name: 'Ingvar the Plunderer',
      coords: [52.4, 52.6]
   };

   rares[13] = {
      name: 'Prince Keleseth',
      coords: [54.0, 44.7]
   };

   rares[14] = {
      name: 'The Black Knight',
      coords: [64.8, 22.1]
   };

   rares[15] = {
      name: 'Bronjahm',
      coords: [70.7, 38.4]
   };

   rares[16] = {
      name: 'Scourgelord Tyrannus',
      coords: [47.2, 66.1]
   };

   rares[17] = {
      name: 'Forgemaster Garfrost',
      coords: [58.6, 72.5]
   };

   rares[18] = {
      name: 'Marwyn',
      coords: [58.2, 83.4]
   };

   rares[19] = {
      name: 'Falric',
      coords: [50.2, 87.9]
   };

   return rares;
}

export interface Rare {
   name: string;
   coords: [number, number];
}

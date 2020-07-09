<template>
  <div class="top-players">
    <div class="logo"><img :src="img.medal" /></div>
    <div class='top-players-lists'>
    <div class='title'><span v-for="(item,i) in titles" :key="i">{{item}}</span></div>
    <ul>
        <li v-for="(item,i) in state.points" :key="i">
        <a>{{item.name}}</a>
        <a>{{item.points}}</a>
        </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import PointsRanking from '../network/topPlayers';
import Medal from '../assets/images/logo/medal.png';

const titles = ['Rank', 'Name', 'Points'];
export default {
  name: 'TopPlayers',
  components: {},
  setup() {
    const state = reactive({
      points: null,
    });
    const sortNumber = (a, b) => b.points - a.points;
    PointsRanking().then((res) => {
      state.points = res.data.players.sort(sortNumber);
    });
    return {
      state,
      titles,
      img: { medal: Medal },
    };
  },
};
</script>
<style scoped lang="scss">
   a {
			color: #525C66;
			text-decoration: none;
		}
		.top-players {
      float: left;
			background:#182a40;
      width: 100%;
      min-height: 100vh;
      .logo{
        text-align: center;
        img{
          width: 200px;
          height: 200px;
        }
      }
      .top-players-lists{
        margin: 40px;
        margin-top:0;
        border-radius:25px;
        .title{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        color: #5b697b;
        background: #081521;
        height: 6vh;
        justify-content: space-around;
        align-items: center;
      }
        ul{
          counter-reset: section;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-around;
          width: 100%;
          line-height: 46px;
          height: 46px;
          overflow: hidden;
          font-size: 14px;
          text-align:center;
      a{
        color: #e1e2e3;
        width: 25%;
      }
		}
		li:before {
      border: 3px solid #20974a;
      color: #20974a;
      margin: 12px 5%;
      background: #081521;
			counter-increment: section;
			content: counter(section);
			display: inline-block;
			padding: 0 12px;
			margin-right: 10px;
			height: 18px;
			line-height: 18px;
			border-radius: 3px;
			font-size: 9px
		}
    li:nth-of-type(odd){
      background: #112335;
    }
        li:nth-of-type(even){
      background: #091b2c;
    }
      }
      li:nth-child(1):before {
      color: #fff;
			background: #ea554e
		}
      li:nth-child(2):before {
      color: #fff;
			background: #feee7d
		}
      li:nth-child(3):before {
      color: #fff;
			background: #3dd28d
		}
     li:last-child{
       border-bottom-left-radius: 10px;
       border-bottom-right-radius: 10px;
    }
    }
</style>

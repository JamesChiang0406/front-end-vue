(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d40d50b8"],{"569d":function(e,t,r){},7156:function(e,t,r){var s=r("1626"),a=r("861d"),i=r("d2bb");e.exports=function(e,t,r){var n,c;return i&&s(n=t.constructor)&&n!==r&&a(c=n.prototype)&&c!==r.prototype&&i(e,c),e}},a9e3:function(e,t,r){"use strict";var s=r("83ab"),a=r("da84"),i=r("94ca"),n=r("6eeb"),c=r("5135"),o=r("c6b6"),l=r("7156"),u=r("d9b5"),d=r("c04e"),p=r("d039"),f=r("7c73"),w=r("241c").f,h=r("06cf").f,v=r("9bf2").f,m=r("58a8").trim,g="Number",k=a[g],x=k.prototype,C=o(f(x))==g,b=function(e){if(u(e))throw TypeError("Cannot convert a Symbol value to a number");var t,r,s,a,i,n,c,o,l=d(e,"number");if("string"==typeof l&&l.length>2)if(l=m(l),t=l.charCodeAt(0),43===t||45===t){if(r=l.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:s=2,a=49;break;case 79:case 111:s=8,a=55;break;default:return+l}for(i=l.slice(2),n=i.length,c=0;c<n;c++)if(o=i.charCodeAt(c),o<48||o>a)return NaN;return parseInt(i,s)}return+l};if(i(g,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var A,y=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof y&&(C?p((function(){x.valueOf.call(r)})):o(r)!=g)?l(new k(b(t)),r,y):b(t)},T=s?w(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),_=0;T.length>_;_++)c(k,A=T[_])&&!c(y,A)&&v(y,A,h(k,A));y.prototype=x,x.constructor=y,n(a,g,y)}},b22f:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"sidebar-area col-3 px-4 pt-2"},[s("SideBar",{on:{openArea:e.openTweetArea}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isProcessing,expression:"isProcessing"}],staticClass:"fa-3x col-6",staticStyle:{border:"2px #e9e9e9 solid",padding:"0"}},[s("i",{staticClass:"fas fa-circle-notch fa-spin"})]),s("div",{staticClass:"user-self col-6 p-0 border",class:{dataReading:e.isProcessing}},[s("div",{staticClass:"nav-bar d-flex align-items-center px-3 py-2",staticStyle:{"margin-bottom":"3px"}},[s("div",{staticClass:"title d-flex flex-column"},[s("span",{staticClass:"user-name"},[e._v(e._s(e.user.name))]),s("small",{staticClass:"tweet-numbers"},[e._v(e._s(e.tweets.length)+" 推文")])])]),s("div",{staticClass:"user-profile position-relative"},[s("div",{staticClass:"picture-area"},[s("img",{staticStyle:{width:"100%",height:"250px","background-size":"cover","background-position":"center"},attrs:{src:e.user.cover,alt:"user-pic"}}),s("div",{staticClass:"edit-area d-flex justify-content-between px-3"},[s("img",{staticClass:"user-pic",attrs:{src:e.user.avatar,alt:"user-pic"}})])])]),s("div",{staticClass:"introduction d-flex flex-column",staticStyle:{"margin-top":"30px",padding:"15px"}},[s("div",{staticClass:"name-account d-flex flex-column position-relative mb-3"},[s("span",{staticClass:"user-name"},[e._v(e._s(e.user.name))]),s("small",{staticClass:"user-account"},[e._v("@"+e._s(e.user.account))])]),s("p",{staticClass:"description"},[e._v(" "+e._s(e.user.introduction)+" ")]),s("div",{staticClass:"followings-followers d-flex"},[s("div",{staticClass:"mr-3"},[s("router-link",{staticClass:"followers",attrs:{to:{name:"other-user-follower",params:{id:this.id}}}},[s("span",[e._v(e._s(e.user.followerCount)+"位跟隨者")])])],1),s("div",[s("router-link",{staticClass:"followings",attrs:{to:{name:"other-user-following",params:{id:this.id}}}},[s("span",[e._v(e._s(e.user.followingCount)+"個跟隨中")])])],1)])]),s("div",{staticClass:"show-btns d-flex justify-content-start border-bottom"},[s("div",{staticClass:"changeArea",class:{firstClicked:e.isTweetsArea},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchTweets()}}},[e._v(" 推文 ")]),s("div",{staticClass:"changeArea",class:{firstClicked:e.isRepliedArea},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchReplies(e.id)}}},[e._v(" 回覆的內容 ")]),s("div",{staticClass:"changeArea",class:{firstClicked:e.isLikedArea},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchLikedTweets(e.id)}}},[e._v(" 喜歡的內容 ")])]),e._l(e.tweets,(function(t){return s("div",{key:t.id,staticClass:"other-tweets d-flex py-2"},[s("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[s("div",{staticClass:"image-area pt-2",staticStyle:{"margin-right":"15px"}},[s("router-link",{attrs:{to:{name:"other-user",params:{id:t.UserId}}}},[s("img",{staticClass:"avatar",staticStyle:{width:"40px",height:"40px"},attrs:{src:t.user.avatar,alt:"icon"}})])],1),s("div",{staticClass:"tweets-area d-flex flex-wrap"},[s("div",{staticClass:"profile d-flex justify-content-start align-items-center"},[s("router-link",{staticClass:"follower-name d-flex align-items-center",attrs:{to:{name:"other-user",params:{id:t.UserId}}}},[s("span",[e._v(e._s(t.user.name))])]),s("span",{staticClass:"follower-account"},[e._v("@"+e._s(t.user.account)+" ‧ "+e._s(t.fromNow))])],1),e.isRepliedArea?s("span",{staticStyle:{"font-size":"0.75em"}},[e._v("回覆給 "),s("router-link",{staticClass:"repliedArea",attrs:{to:{name:"other-user",params:{id:t.repliedUserId}}}},[e._v(" @"+e._s(t.repliedUserAccount)+" ")])],1):e._e(),e.isRepliedArea?s("div",{staticClass:"reply",staticStyle:{"text-align":"start"}},[s("p",{staticClass:"m-0"},[e._v(" "+e._s(t.description)+" ")])]):s("div",{staticClass:"tweet",staticStyle:{"text-align":"start"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.tweetPage(t.id)}}},[s("p",{staticClass:"m-0"},[e._v(" "+e._s(t.description)+" ")])]),e.iconSwitch?s("div",{staticClass:"icon-area d-flex justify-content-start"},[s("div",{staticClass:"comments",staticStyle:{"margin-right":"30px"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.openReplyArea(t.id)}}},[s("img",{staticClass:"reply-btn",staticStyle:{"margin-right":"10px"},attrs:{src:r("bf43"),alt:"comment-icon"}}),s("small",[e._v(e._s(t.repliedCount))])]),s("div",{staticClass:"likes"},[t.isUserLiked?s("img",{staticStyle:{"margin-right":"10px",width:"13px",height:"13px"},attrs:{src:r("cf34"),alt:"like-icon"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.unlikeThisTweet(t.id)}}}):s("img",{staticStyle:{"margin-right":"10px"},attrs:{src:r("f5ca"),alt:"like-icon"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.likeThisTweet(t.id)}}}),s("small",{class:{isActived:t.isUserLiked},staticStyle:{"text-decoration-line":"none"}},[e._v(e._s(t.likedCount))])])]):e._e()])]),t.isUserTweet?s("div",{staticStyle:{width:"10%",height:"30px"}},[s("div",{on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.deleteTweet(t.id,t.UserId)}}},[s("i",{staticClass:"fas fa-times del-btn"})])]):e._e()])}))],2),s("div",{staticClass:"col-3 pr-0 pl-2 pt-2"},[s("FollowWho",{attrs:{"to-page-id":e.id}})],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isTweetBtnClicked,expression:"isTweetBtnClicked"}],staticClass:"tweeting-area"},[s("TweetingForm",{attrs:{"user-avatar":e.userAvatar},on:{closeArea:e.closeTweetArea}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isReplyBtnClicked,expression:"isReplyBtnClicked"}],staticClass:"replying-area"},[s("ReplyingForm",{attrs:{"reply-tweet":e.replyTweet},on:{closeArea:e.closeReplyArea,closeAndUp:e.closeAndUp}})],1)])},a=[],i=r("1da1"),n=(r("4de4"),r("a9e3"),r("159b"),r("d81d"),r("a4d3"),r("e01a"),r("96cf"),r("7c08")),c=r("61f9"),o=r("cfb4"),l=r("c245"),u=r("2fa3"),d=r("4cce"),p=r("7482"),f=r("c1df"),w=r.n(f),h={components:{SideBar:n["a"],FollowWho:c["a"],TweetingForm:o["a"],ReplyingForm:l["a"]},data:function(){return{userAvatar:this.$store.state.currentUser.avatar,id:this.$route.params.id,user:{},tweets:[],isTweetsArea:!0,isRepliedArea:!1,isLikedArea:!1,iconSwitch:!0,errMsg:"",isProcessing:!1,isTweetBtnClicked:!1,isReplyBtnClicked:!1,replyTweet:{userId:-1,tweetId:-1,createdAt:"",description:"",user:{account:"",avatar:"",name:""}}}},created:function(){this.selfOrUsers(),this.fetchUser({userId:this.id}),this.fetchTweets(),w.a.locale("zh-tw")},beforeRouteUpdate:function(e,t,r){this.id=e.params.id,this.fetchUser({userId:this.id}),this.fetchTweets(),r()},methods:{tweetPage:function(e){this.$router.push({name:"tweet-page",params:{id:e}})},fetchUser:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s=e.userId,r.prev=1,t.isProcessing=!0,r.next=5,d["a"].getUser({userId:s});case 5:a=r.sent,i=a.data,t.user=i,t.isProcessing=!1,r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](1),u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試！"});case 14:case"end":return r.stop()}}),r,null,[[1,11]])})))()},fetchTweets:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.isTweetsArea=!0,e.isRepliedArea=!1,e.isLikedArea=!1,e.iconSwitch=!0,t.next=7,p["a"].getUserTweets({userId:e.id});case 7:if(r=t.sent,s=r.data,"error"!==s.status){t.next=11;break}throw new Error;case 11:e.tweets=s,e.tweets=e.tweets.filter((function(t){return t.UserId===Number(e.id)})),e.tweets.forEach((function(e){e.fromNow=w()(e.createdAt).fromNow()})),0===e.tweets.length&&u["a"].fire({icon:"warning",title:"無相關資料，請重新確認！"}),t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](0),u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試！"});case 20:case"end":return t.stop()}}),t,null,[[0,17]])})))()},fetchLikedTweets:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,t.isTweetsArea=!1,t.isRepliedArea=!1,t.isLikedArea=!0,t.iconSwitch=!0,r.next=7,p["a"].getUserTweets({userId:e});case 7:if(s=r.sent,a=s.data,"error"!==a.status){r.next=11;break}throw new Error;case 11:t.tweets=a,t.tweets=t.tweets.filter((function(e){return!0===e.isLiked})),t.tweets.forEach((function(e){e.isUserTweet=t.$store.state.currentUser.id===e.UserId,e.fromNow=w()(e.createdAt).fromNow()})),0===t.tweets.length&&u["a"].fire({icon:"warning",title:"無相關資料，請重新確認！"}),r.next=20;break;case 17:r.prev=17,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試！"});case 20:case"end":return r.stop()}}),r,null,[[0,17]])})))()},fetchReplies:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,t.isTweetsArea=!1,t.isLikedArea=!1,t.iconSwitch=!1,r.next=6,p["a"].getReplies({userId:e});case 6:if(s=r.sent,a=s.data,"error"!==a.status){r.next=11;break}throw t.errMsg=a.message,new Error;case 11:t.tweets=a,t.tweets.forEach((function(e){e.fromNow=w()(e.createdAt).fromNow()})),t.isRepliedArea=!0,r.next=20;break;case 16:r.prev=16,r.t0=r["catch"](0),t.isRepliedArea=!0,u["a"].fire({icon:"warning",title:t.errMsg});case 20:case"end":return r.stop()}}),r,null,[[0,16]])})))()},likeThisTweet:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,p["a"].likeTweet({tweetId:e});case 3:if(s=r.sent,a=s.data,"error"!==a.status){r.next=7;break}throw new Error(a.message);case 7:t.tweets.map((function(t){t.id===e&&(t.isUserLiked=!0,t.likedCount+=1)})),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法操作，請稍後再試！"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},unlikeThisTweet:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,p["a"].unlikeTweet({tweetId:e});case 3:if(s=r.sent,a=s.data,"error"!==a.status){r.next=7;break}throw new Error(a.message);case 7:t.tweets.map((function(t){t.id===e&&(t.isUserLiked=!1,t.likedCount-=1)})),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法操作，請稍後再試！"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},deleteTweet:function(e,t){var r=this;try{var s=this.$store.state.currentUser.id;if(s!==t)throw new Error("此動作未授權，請重新確認！");u["a"].fire({icon:"warning",title:"確定要刪除嗎？",showConfirmButton:!0,showCancelButton:!0}).then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(s){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!s.isConfirmed){t.next=11;break}return t.next=3,p["a"].deleteTweet({tweet_id:e});case 3:if(a=t.sent,i=a.data,"error"!==i.status){t.next=7;break}throw new Error(i.message);case 7:u["a"].fire({icon:"success",title:"推文刪除成功"}),r.tweets=r.tweets.filter((function(t){return t.id!==e})),t.next=12;break;case 11:return t.abrupt("return");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}catch(a){console.log(a),u["a"].fire({icon:"error",title:"無法刪除，請稍後再試！"})}},openTweetArea:function(){this.isTweetBtnClicked=!0},closeTweetArea:function(){this.isTweetBtnClicked=!1},selfOrUsers:function(){this.$route.params.id===this.$store.state.currentUser.id&&this.$router.push({name:"user-self"})},openReplyArea:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,p["a"].getTweet({tweetId:e});case 3:if(s=r.sent,a=s.data,"error"!==a.status){r.next=7;break}throw new Error(a.message);case 7:t.replyTweet.userId=a.UserId,t.replyTweet.tweetId=e,t.replyTweet.createdAt=w()(a.createdAt).fromNow(),t.replyTweet.description=a.description,t.replyTweet.user=a.user,t.isReplyBtnClicked=!0,r.next=18;break;case 15:r.prev=15,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法取得推文，請稍後再試！"});case 18:case"end":return r.stop()}}),r,null,[[0,15]])})))()},closeReplyArea:function(){this.isReplyBtnClicked=!1},closeAndUp:function(e){this.tweets.map((function(t){t.id===e&&(t.repliedCount+=1)})),this.isReplyBtnClicked=!1}}},v=h,m=(r("f1fc"),r("2877")),g=Object(m["a"])(v,s,a,!1,null,"77248f85",null);t["default"]=g.exports},f1fc:function(e,t,r){"use strict";r("569d")}}]);
//# sourceMappingURL=chunk-d40d50b8.425e9aab.js.map
export const emojis = {
  eyes: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/eyes_1f440.png',
  heartbroken:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/broken-heart_1f494.png',
  grape:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/grapes_1f347.png',
  home: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/house-with-garden_1f3e1.png',
  bell: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/bellhop-bell_1f6ce-fe0f.png',
  orderActive:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/hourglass-not-done_23f3.png',
  orderComplete:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/hundred-points_1f4af.png',
  orderCancelled:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/crying-face_1f622.png',
  noNotifications:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/open-mailbox-with-lowered-flag_1f4ed.png',
  fireCracker:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/firecracker_1f9e8.png',
  yes: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/thumbs-up_1f44d.png',
  no: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/thumbs-down_1f44e.png',
  hide: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/see-no-evil-monkey_1f648.png',
  tree: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/deciduous-tree_1f333.png',
  free: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/money-with-wings_1f4b8.png',
  partyingFace:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/partying-face_1f973.png',
  momoLogo:
    'https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2020/12/MTN-Rwanda-MoMo-Logo-284x300.jpg',
  confetti:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/confetti-ball_1f38a.png',
};

export const formatPrice = (price) => {
  if (price == undefined || price == 'undefined') {
    return 0;
  } else {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export const formatDate = (str) => {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var d = new Date(str);
  var dayName = days[d.getDay()];

  let monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  var month = monthNames[d.getMonth()];

  let day = d.getDate();
  let year = d.getFullYear();

  return `${dayName}, ${month} ${day} ${year}`;
};

export const jsonparsed = (string) => {
  return JSON.parse(string);
};

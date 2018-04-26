//考试时间

var examtimes = {

	isExamTimes: function(now) {
		let et = true;
		let start = {
			hour: 12,
			minute: 6
		}
		let end = {
			hour: 12,
			minute: 49
		}

		//12:01

		if(start.hour == end.hour) { //如果开始和结束时间规定在同一个小时

			if(now.minute > start.minute && now.minute < end.minute) {
				et = true;
			} else {
				et = false;
			}

		} else {//如果开始和结束时间规定不在同一小时

			if(now.hour > start.hour && now.hour < end.hour) {
				et = true;
			} else if(now.hour == end.hour) {
				if(now.minute <= end.minute) {
					et = true;
				} else {
					et = false;
				}
			} else if(now.hour == start.hour) {

				if(now.minute >= start.minute) {
					et = true;
				} else {
					et = false;
				}

			} else {
				et = false;
			}

		}

		return et;
	}

}
export default examtimes;
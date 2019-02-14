class Scheduler {
    constructor({
        id,text,priorityId,startDate,endDate,description
    }){
        this.id = id;
        this.text = text;
        this.priorityId = priorityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
module.exports = Scheduler;
class SectionStatus{
    constructor( name, active)
    {
        this.name = name;
        this.active = active;
    }

    toString()
    {
        return `SectionStatus - ${[this.name]} - active : ${this.active}`;
    }
}

module.exports = SectionStatus;
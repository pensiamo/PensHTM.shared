export const WorkOrderStatus = {
    New: 1,
    Assigned: 2,
    Acknowledged: 3,
    WorkInProgress: 4,
    Reassigned: 5,
    Escalated: 6,
    Scheduled: 7,
    InTransit: 8,
    OnAsset: 9,
    ApprovalRequired: 10,
    AwaitingParts: 11,
    AwaitingOutsideService: 12,
    OffsiteServiceRequired: 13,
    Complete: 14,
    Invoiced: 15
}

export const WorkOrderSource = {
    Phone: 1,
    Kiosk: 2,
    Mobile: 3,
    Technician: 3,
}

export const EntityType = {
    Manufacturer: { name: 'Manufacturer', id: '2' },
    Product: { name: 'Product', id: '1' }
}

export const WorkOrderType = {
    Technician: "Technician",
    Caller: "Caller"
}

export const encounterStartMethod = {
    Scan: 1,
    ManualEntry: 2,
    NoACN: 3
}

export const PhoneNumberType = {
    Fax: 1,
    PhoneNumber: 2
}

export const ActionRequesteds = {
    RepairReplace: 1,
    PMDueOrLate: 2,
    CallRequestor: 3,
    TagInspectAssets: 4,
    RequireAssistance: 5
}

export const Urgencies = {
    Today: 1,
    ScheduleMe: 2,
    IncidentReport: 3,
    Stat: 4,
};

export const ActivityActions = {
    RepairReplace: 1,
    PMDueOrLate: 2,
    CallRequestor: 3,
    TagNewEquipment: 4,
    CallVendor: 5,
    RequireAssitance: 6
}

export const DynamicSections = [
    { displayName: "Facility", propertyName: "facilityName", },
    { displayName: "Department", propertyName: "facilityDepartmentName", }
];

export const DocTypes = {
    NamePlate: 73
}

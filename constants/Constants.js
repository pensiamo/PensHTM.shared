export const AsyncStoragePrefix = 'EvolutionDxStorage:';

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

export const ServiceCallSource = {
    PhoneRequest: { name: 'Phone Request',id: '1' },
    WebRequest: { name: 'Web Request',id: '2' },
    TechnicianGenerated: { name: 'Technician Generated',id: '3' }
}

export const EntityType = {
    Manufacturer: { name: 'Manufacturer',id: '2' },
    Product: { name: 'Product',id: '1' }
}

export const WorkOrderType = {
    Technician: "Technician",
    Caller: "Caller"
}

export const EncounterStartMethod = {
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
    Today: { name: 'Today',id: '1' },
    ScheduleMe: { name: 'Schedule Me',id: '2' },
    IncidentReport: { name: 'Incident Report',id: '3' },
    Stat: { name: 'Stat',id: '4' },
};

export const ActivityActions = {
    RepairReplace: 1,
    PMDueOrLate: 2,
    CallRequestor: 3,
    TagNewEquipment: 4,
    CallVendor: 5,
    RequireAssistance: 6
};

export const DynamicSections = [
    { displayName: "Facility",propertyName: "facilityName",},
    { displayName: "Department",propertyName: "facilityDepartmentName",}
];

export const DocTypes = {
    NamePlate: 73
};

export const ActivityType = {
    Undetermined: 1,
    PM: 2,
    SM: 3,
    Repair: 4,
    SafetyCheck: 6,
    InspectInventory: 7,
    Security: 8,
    HWUpdate: 9,
    SWUpdate: 10,
    InstallDeinstall: 11,
    Investigation: 12,
    ProvideInformation: 13,
    PurchaseSupport: 14,
    ProjectTask: 15,
    Training: 16,
    Recall: 17
};

export const IconType = {
    Ionicons: 1,
    FontAwesome: 2,
    MaterialCommunityIcons: 3
};

export const ServiceCallTabs = {
    Unacknowledged: 0,
    Acknowledged: 1,
    Worked: 2
};

export const FacilitySearchLevel = {
    Facility: 0,
    Department: 1,
    Unit: 2
};

export const DateFilterMethod = {
    AddedDateTime: 0,
    LastEncounteredDateTime: 1,
    CompletedDateTime: 2,
}
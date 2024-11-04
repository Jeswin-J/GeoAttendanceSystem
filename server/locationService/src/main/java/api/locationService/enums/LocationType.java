package api.locationService.enums;

public enum LocationType {
    REMOTE,
    GAIL_OFFICE,
    ;

    @Override
    public String toString() {
        return name();
    }
}

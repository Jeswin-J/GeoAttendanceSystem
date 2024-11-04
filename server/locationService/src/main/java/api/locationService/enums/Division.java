package api.locationService.enums;

public enum Division {
    NORTH,
    EAST,
    WEST,
    SOUTH,
    NORTHEAST,
    NORTHWEST,
    SOUTHEAST,
    SOUTHWEST;

    @Override
    public String toString() {
        return name();
    }
}

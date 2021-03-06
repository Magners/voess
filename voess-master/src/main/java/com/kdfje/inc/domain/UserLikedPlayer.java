package com.kdfje.inc.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A UserLikedPlayer.
 */
@Entity
@Table(name = "user_liked_player")
public class UserLikedPlayer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "start_date_time")
    private ZonedDateTime startDateTime;

    @Column(name = "user_liked")
    private Boolean userLiked;

    @ManyToOne
    private User user;

    @ManyToOne
    private Player player;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartDateTime() {
        return startDateTime;
    }

    public UserLikedPlayer startDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
        return this;
    }

    public void setStartDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Boolean isUserLiked() {
        return userLiked;
    }

    public UserLikedPlayer userLiked(Boolean userLiked) {
        this.userLiked = userLiked;
        return this;
    }

    public void setUserLiked(Boolean userLiked) {
        this.userLiked = userLiked;
    }

    public User getUser() {
        return user;
    }

    public UserLikedPlayer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Player getPlayer() {
        return player;
    }

    public UserLikedPlayer player(Player player) {
        this.player = player;
        return this;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserLikedPlayer userLikedPlayer = (UserLikedPlayer) o;
        if (userLikedPlayer.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, userLikedPlayer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserLikedPlayer{" +
            "id=" + id +
            ", startDateTime='" + startDateTime + "'" +
            ", userLiked='" + userLiked + "'" +
            '}';
    }
}

package com.kdfje.inc.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * entidades asocitivas
 */
@ApiModel(description = "entidades asocitivas")
@Entity
@Table(name = "friendship")
public class Friendship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "start_date_time")
    private ZonedDateTime startDateTime;

    @Column(name = "finsh_date_time")
    private ZonedDateTime finshDateTime;

    @ManyToOne
    private User frienshipFrom;

    @ManyToOne
    private User frienshipTo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartDateTime() {
        return startDateTime;
    }

    public Friendship startDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
        return this;
    }

    public void setStartDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public ZonedDateTime getFinshDateTime() {
        return finshDateTime;
    }

    public Friendship finshDateTime(ZonedDateTime finshDateTime) {
        this.finshDateTime = finshDateTime;
        return this;
    }

    public void setFinshDateTime(ZonedDateTime finshDateTime) {
        this.finshDateTime = finshDateTime;
    }

    public User getFrienshipFrom() {
        return frienshipFrom;
    }

    public Friendship frienshipFrom(User user) {
        this.frienshipFrom = user;
        return this;
    }

    public void setFrienshipFrom(User user) {
        this.frienshipFrom = user;
    }

    public User getFrienshipTo() {
        return frienshipTo;
    }

    public Friendship frienshipTo(User user) {
        this.frienshipTo = user;
        return this;
    }

    public void setFrienshipTo(User user) {
        this.frienshipTo = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Friendship friendship = (Friendship) o;
        if (friendship.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, friendship.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Friendship{" +
            "id=" + id +
            ", startDateTime='" + startDateTime + "'" +
            ", finshDateTime='" + finshDateTime + "'" +
            '}';
    }
}

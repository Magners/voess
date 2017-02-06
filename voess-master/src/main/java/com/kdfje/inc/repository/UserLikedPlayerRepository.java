package com.kdfje.inc.repository;

import com.kdfje.inc.domain.UserLikedPlayer;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserLikedPlayer entity.
 */
@SuppressWarnings("unused")
public interface UserLikedPlayerRepository extends JpaRepository<UserLikedPlayer,Long> {

    @Query("select userLikedPlayer from UserLikedPlayer userLikedPlayer where userLikedPlayer.user.login = ?#{principal.username}")
    List<UserLikedPlayer> findByUserIsCurrentUser();

}

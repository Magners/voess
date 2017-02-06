package com.kdfje.inc.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kdfje.inc.domain.UserLikedTeams;

import com.kdfje.inc.repository.UserLikedTeamsRepository;
import com.kdfje.inc.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserLikedTeams.
 */
@RestController
@RequestMapping("/api")
public class UserLikedTeamsResource {

    private final Logger log = LoggerFactory.getLogger(UserLikedTeamsResource.class);
        
    @Inject
    private UserLikedTeamsRepository userLikedTeamsRepository;

    /**
     * POST  /user-liked-teams : Create a new userLikedTeams.
     *
     * @param userLikedTeams the userLikedTeams to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userLikedTeams, or with status 400 (Bad Request) if the userLikedTeams has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-liked-teams")
    @Timed
    public ResponseEntity<UserLikedTeams> createUserLikedTeams(@RequestBody UserLikedTeams userLikedTeams) throws URISyntaxException {
        log.debug("REST request to save UserLikedTeams : {}", userLikedTeams);
        if (userLikedTeams.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userLikedTeams", "idexists", "A new userLikedTeams cannot already have an ID")).body(null);
        }
        UserLikedTeams result = userLikedTeamsRepository.save(userLikedTeams);
        return ResponseEntity.created(new URI("/api/user-liked-teams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userLikedTeams", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-liked-teams : Updates an existing userLikedTeams.
     *
     * @param userLikedTeams the userLikedTeams to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userLikedTeams,
     * or with status 400 (Bad Request) if the userLikedTeams is not valid,
     * or with status 500 (Internal Server Error) if the userLikedTeams couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-liked-teams")
    @Timed
    public ResponseEntity<UserLikedTeams> updateUserLikedTeams(@RequestBody UserLikedTeams userLikedTeams) throws URISyntaxException {
        log.debug("REST request to update UserLikedTeams : {}", userLikedTeams);
        if (userLikedTeams.getId() == null) {
            return createUserLikedTeams(userLikedTeams);
        }
        UserLikedTeams result = userLikedTeamsRepository.save(userLikedTeams);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userLikedTeams", userLikedTeams.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-liked-teams : get all the userLikedTeams.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userLikedTeams in body
     */
    @GetMapping("/user-liked-teams")
    @Timed
    public List<UserLikedTeams> getAllUserLikedTeams() {
        log.debug("REST request to get all UserLikedTeams");
        List<UserLikedTeams> userLikedTeams = userLikedTeamsRepository.findAll();
        return userLikedTeams;
    }

    /**
     * GET  /user-liked-teams/:id : get the "id" userLikedTeams.
     *
     * @param id the id of the userLikedTeams to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userLikedTeams, or with status 404 (Not Found)
     */
    @GetMapping("/user-liked-teams/{id}")
    @Timed
    public ResponseEntity<UserLikedTeams> getUserLikedTeams(@PathVariable Long id) {
        log.debug("REST request to get UserLikedTeams : {}", id);
        UserLikedTeams userLikedTeams = userLikedTeamsRepository.findOne(id);
        return Optional.ofNullable(userLikedTeams)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /user-liked-teams/:id : delete the "id" userLikedTeams.
     *
     * @param id the id of the userLikedTeams to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-liked-teams/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserLikedTeams(@PathVariable Long id) {
        log.debug("REST request to delete UserLikedTeams : {}", id);
        userLikedTeamsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userLikedTeams", id.toString())).build();
    }

}

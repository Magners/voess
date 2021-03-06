package com.kdfje.inc.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kdfje.inc.domain.UserLikedVideo;

import com.kdfje.inc.repository.UserLikedVideoRepository;
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
 * REST controller for managing UserLikedVideo.
 */
@RestController
@RequestMapping("/api")
public class UserLikedVideoResource {

    private final Logger log = LoggerFactory.getLogger(UserLikedVideoResource.class);
        
    @Inject
    private UserLikedVideoRepository userLikedVideoRepository;

    /**
     * POST  /user-liked-videos : Create a new userLikedVideo.
     *
     * @param userLikedVideo the userLikedVideo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userLikedVideo, or with status 400 (Bad Request) if the userLikedVideo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-liked-videos")
    @Timed
    public ResponseEntity<UserLikedVideo> createUserLikedVideo(@RequestBody UserLikedVideo userLikedVideo) throws URISyntaxException {
        log.debug("REST request to save UserLikedVideo : {}", userLikedVideo);
        if (userLikedVideo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userLikedVideo", "idexists", "A new userLikedVideo cannot already have an ID")).body(null);
        }
        UserLikedVideo result = userLikedVideoRepository.save(userLikedVideo);
        return ResponseEntity.created(new URI("/api/user-liked-videos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userLikedVideo", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-liked-videos : Updates an existing userLikedVideo.
     *
     * @param userLikedVideo the userLikedVideo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userLikedVideo,
     * or with status 400 (Bad Request) if the userLikedVideo is not valid,
     * or with status 500 (Internal Server Error) if the userLikedVideo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-liked-videos")
    @Timed
    public ResponseEntity<UserLikedVideo> updateUserLikedVideo(@RequestBody UserLikedVideo userLikedVideo) throws URISyntaxException {
        log.debug("REST request to update UserLikedVideo : {}", userLikedVideo);
        if (userLikedVideo.getId() == null) {
            return createUserLikedVideo(userLikedVideo);
        }
        UserLikedVideo result = userLikedVideoRepository.save(userLikedVideo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userLikedVideo", userLikedVideo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-liked-videos : get all the userLikedVideos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userLikedVideos in body
     */
    @GetMapping("/user-liked-videos")
    @Timed
    public List<UserLikedVideo> getAllUserLikedVideos() {
        log.debug("REST request to get all UserLikedVideos");
        List<UserLikedVideo> userLikedVideos = userLikedVideoRepository.findAll();
        return userLikedVideos;
    }

    /**
     * GET  /user-liked-videos/:id : get the "id" userLikedVideo.
     *
     * @param id the id of the userLikedVideo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userLikedVideo, or with status 404 (Not Found)
     */
    @GetMapping("/user-liked-videos/{id}")
    @Timed
    public ResponseEntity<UserLikedVideo> getUserLikedVideo(@PathVariable Long id) {
        log.debug("REST request to get UserLikedVideo : {}", id);
        UserLikedVideo userLikedVideo = userLikedVideoRepository.findOne(id);
        return Optional.ofNullable(userLikedVideo)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /user-liked-videos/:id : delete the "id" userLikedVideo.
     *
     * @param id the id of the userLikedVideo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-liked-videos/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserLikedVideo(@PathVariable Long id) {
        log.debug("REST request to delete UserLikedVideo : {}", id);
        userLikedVideoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userLikedVideo", id.toString())).build();
    }

}

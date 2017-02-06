package com.kdfje.inc.repository;

import com.kdfje.inc.domain.TeamFormer;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TeamFormer entity.
 */
@SuppressWarnings("unused")
public interface TeamFormerRepository extends JpaRepository<TeamFormer,Long> {

}

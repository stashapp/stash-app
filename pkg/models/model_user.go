package models

import (
	"fmt"
	"time"

	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           uuid.UUID     `db:"id" json:"id"`
	Name         string        `db:"name" json:"name"`
	PasswordHash string        `db:"password_hash" json:"password_hash"`
	Email        string        `db:"email" json:"email"`
	APIKey       string        `db:"api_key" json:"api_key"`
	APICalls     int           `db:"api_calls" json:"api_calls"`
	InviteTokens int           `db:"invite_tokens" json:"invite_tokens"`
	InvitedByID  uuid.NullUUID `db:"invited_by" json:"invited_by"`
	LastAPICall  time.Time     `db:"last_api_call" json:"last_api_call"`
	CreatedAt    time.Time     `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time     `db:"updated_at" json:"updated_at"`
}

func (p User) GetID() uuid.UUID {
	return p.ID
}

type Users []*User

func (p Users) Each(fn func(interface{})) {
	for _, v := range p {
		fn(*v)
	}
}

func (p *Users) Add(o interface{}) {
	*p = append(*p, o.(*User))
}

type UserRole struct {
	UserID uuid.UUID `db:"user_id" json:"user_id"`
	Role   string    `db:"role" json:"role"`
}

type UserRoles []*UserRole

func (p UserRoles) Each(fn func(interface{})) {
	for _, v := range p {
		fn(*v)
	}
}

func (p *UserRoles) Add(o interface{}) {
	*p = append(*p, o.(*UserRole))
}

func (p UserRoles) ToRoles() []RoleEnum {
	var ret []RoleEnum
	for _, v := range p {
		ret = append(ret, RoleEnum(v.Role))
	}

	return ret
}

func CreateUserRoles(userID uuid.UUID, roles []RoleEnum) UserRoles {
	var ret UserRoles

	for _, role := range roles {
		ret = append(ret, &UserRole{
			UserID: userID,
			Role:   role.String(),
		})
	}

	return ret
}

func (p *User) SetPasswordHash(pw string) error {
	// generate password from input
	hash, err := bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	p.PasswordHash = string(hash)

	return nil
}

func (p User) IsPasswordCorrect(pw string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(p.PasswordHash), []byte(pw))
	return err == nil
}

func (p *User) CopyFromCreateInput(input UserCreateInput) error {
	CopyFull(p, input)

	err := p.SetPasswordHash(input.Password)

	if err != nil {
		return fmt.Errorf("Error setting password: %w", err)
	}

	return nil
}

func (p *User) CopyFromUpdateInput(input UserUpdateInput) error {
	CopyFull(p, input)

	// generate password from input
	if input.Password != nil {
		err := p.SetPasswordHash(*input.Password)
		if err != nil {
			return fmt.Errorf("Error setting password: %w", err)
		}
	}

	return nil
}
